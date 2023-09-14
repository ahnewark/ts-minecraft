import Minecraft from "../../../../../js/net/minecraft/client/Minecraft";
import EntityRenderer from "../../../../../js/net/minecraft/client/render/entity/EntityRenderer";
import World from "../../../../../js/net/minecraft/client/world/World";
import { BlockRegistry } from "../world/block/BlockRegistry";
import BoundingBox from "../../../../../js/net/minecraft/util/BoundingBox";
import MathHelper from "../../../../../js/net/minecraft/util/MathHelper";
import Random from "../../../../../js/net/minecraft/util/Random";

export type EntityMetadata = {id: number, type: number, value: number};

export default class Entity {

    protected minecraft: Minecraft;
    protected world: World;
    protected id: number;
    protected random: Random;
    protected renderer: EntityRenderer;

    protected x: number;
    protected y: number;
    protected z: number;

    protected width: number;
    protected height: number;
    
    protected motionX: number;
    protected motionY: number;
    protected motionZ: number;

    protected stepHeight: number;

    protected onGround: boolean;

    protected rotationYaw: number;
    protected rotationPitch: number;

    protected prevX: number;
    protected prevY: number;
    protected prevZ: number;

    protected prevRotationYaw: number;
    protected prevRotationPitch: number;
    
    protected prevDistanceWalked: number;
    protected distanceWalked: number;
    protected nextStepDistance: number;
    
    protected ticksExisted: number;
    protected isDead: boolean;

    protected serverPositionX: number;
    protected serverPositionY: number;
    protected serverPositionZ: number;

    protected metaData: {[id: number]:EntityMetadata};

    protected boundingBox: BoundingBox;

    protected collision: boolean;

    constructor(minecraft: Minecraft, world: World, id: number) {
        this.minecraft = minecraft;
        this.world = world;
        this.id = id;

        this.random = new Random();
        this.renderer = null;

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.width = 0.0;
        this.height = 0.0;

        this.motionX = 0;
        this.motionY = 0;
        this.motionZ = 0;

        this.stepHeight = 0.0;

        this.onGround = false;

        this.rotationYaw = 0;
        this.rotationPitch = 0;

        this.prevX = 0;
        this.prevY = 0;
        this.prevZ = 0;

        this.prevRotationYaw = 0;
        this.prevRotationPitch = 0;

        this.prevDistanceWalked = 0;
        this.distanceWalked = 0;
        this.nextStepDistance = 1;

        this.ticksExisted = 0;
        this.isDead = false;

        this.serverPositionX = 0;
        this.serverPositionY = 0;
        this.serverPositionZ = 0;

        this.metaData = {};

        this.boundingBox = new BoundingBox();
        this.setPosition(this.x, this.y, this.z);
    }

    initRenderer() {
        this.renderer = this.minecraft.worldRenderer.entityRenderManager.createEntityRendererByEntity(this);
        if (this.renderer === null) {
            throw new Error("No entity renderer for entity " + this.constructor.name + " found!");
        }
    }

    getBlockPosX() {
        return this.x - (this.x < 0 ? 1 : 0);
    }

    getBlockPosY() {
        return this.y - (this.y < 0 ? 1 : 0);
    }

    getBlockPosZ() {
        return this.z - (this.z < 0 ? 1 : 0);
    }

    isInWater() {
        return this.world.getBlockAt(this.getBlockPosX(), this.getBlockPosY(), this.getBlockPosZ()) === BlockRegistry.WATER.getId();
    }

    travelFlying(forward: number, vertical: number, strafe: number) {}

    travel(forward: number, vertical: number, strafe: number) {}

    jump() {}

    moveRelative(forward, up, strafe, friction) {
        let distance = strafe * strafe + up * up + forward * forward;

        if (distance >= 0.0001) {
            distance = Math.sqrt(distance);

            if (distance < 1.0) {
                distance = 1.0;
            }

            distance = friction / distance;
            strafe = strafe * distance;
            up = up * distance;
            forward = forward * distance;

            let yawRadians = MathHelper.toRadians(this.rotationYaw + 180);
            let sin = Math.sin(yawRadians);
            let cos = Math.cos(yawRadians);

            this.motionX += strafe * cos - forward * sin;
            this.motionY += up;
            this.motionZ += forward * cos + strafe * sin;
        }
    }

    travelInWater(forward, vertical, strafe) {
        let slipperiness = 0.8;
        let friction = 0.02;

        this.moveRelative(forward, vertical, strafe, friction);
        this.collision = this.moveCollide(-this.motionX, this.motionY, -this.motionZ);

        this.motionX *= slipperiness;
        this.motionY *= 0.8;
        this.motionZ *= slipperiness;
        this.motionY -= 0.02;
    }

    setPosition(x: number, y: number, z: number) {
        // Update position
        this.x = x;
        this.y = y;
        this.z = z;

        // Update bounding box
        let width = this.width / 2;
        this.boundingBox = new BoundingBox(
            x - width,
            y,
            z - width,
            x + width,
            y + this.height,
            z + width
        );
    }

    setRotation(yaw: number, pitch: number) {
        this.rotationYaw = yaw % 360;
        this.rotationPitch = pitch % 360;
    }

    setTargetPositionAndRotation(x: number, y: number, z: number, yaw: number, pitch: number, increments: number) {
        this.setPosition(x, y, z);
        this.setRotation(yaw, pitch);
    }

    setPositionAndRotation(x: number, y: number, z: number, yaw: number, pitch: number) {
        this.prevX = this.x = x;
        this.prevY = this.y = y;
        this.prevZ = this.z = z;

        this.prevRotationYaw = this.rotationYaw = yaw;
        this.prevRotationPitch = this.rotationPitch = pitch;

        let diffYaw = (this.prevRotationYaw - yaw);
        if (diffYaw < -180) {
            this.prevRotationYaw += 360;
        }
        if (diffYaw >= 180) {
            this.prevRotationYaw -= 360;
        }

        this.setPosition(this.x, this.y, this.z);
        this.setRotation(yaw, pitch);
    }

    onUpdate() {
        this.onEntityUpdate();
    }

    onEntityUpdate() {
        this.prevX = this.x;
        this.prevY = this.y;
        this.prevZ = this.z;

        this.prevDistanceWalked = this.distanceWalked;

        this.prevRotationPitch = this.rotationPitch;
        this.prevRotationYaw = this.rotationYaw;

        this.ticksExisted++;
    }

    getEntityBrightness() {
        let x = MathHelper.floor(this.x);
        let y = MathHelper.floor(this.y + this.getEyeHeight());
        let z = MathHelper.floor(this.z);
        return this.world.getLightBrightness(x, y, z);
    }

    getEyeHeight() {
        return this.boundingBox.height() * 0.8;
    }

    moveCollide(targetX: number, targetY: number, targetZ: number) {
        // Target position
        let originalTargetX = targetX;
        let originalTargetY = targetY;
        let originalTargetZ = targetZ;

        if (this.onGround && this.isSneaking()) {
            for (; targetX !== 0.0 && (this.world.getCollisionBoxes(this.boundingBox.offset(targetX, -this.stepHeight, 0.0))).length === 0; originalTargetX = targetX) {
                if (targetX < 0.05 && targetX >= -0.05) {
                    targetX = 0.0;
                } else if (targetX > 0.0) {
                    targetX -= 0.05;
                } else {
                    targetX += 0.05;
                }
            }

            for (; targetZ !== 0.0 && (this.world.getCollisionBoxes(this.boundingBox.offset(0.0, -this.stepHeight, targetZ))).length === 0; originalTargetZ = targetZ) {
                if (targetZ < 0.05 && targetZ >= -0.05) {
                    targetZ = 0.0;
                } else if (targetZ > 0.0) {
                    targetZ -= 0.05;
                } else {
                    targetZ += 0.05;
                }
            }

            for (; targetX !== 0.0 && targetZ !== 0.0 && (this.world.getCollisionBoxes(this.boundingBox.offset(targetX, -this.stepHeight, targetZ))).length === 0; originalTargetZ = targetZ) {
                if (targetX < 0.05 && targetX >= -0.05) {
                    targetX = 0.0;
                } else if (targetX > 0.0) {
                    targetX -= 0.05;
                } else {
                    targetX += 0.05;
                }

                originalTargetX = targetX;

                if (targetZ < 0.05 && targetZ >= -0.05) {
                    targetZ = 0.0;
                } else if (targetZ > 0.0) {
                    targetZ -= 0.05;
                } else {
                    targetZ += 0.05;
                }
            }
        }

        // Get level tiles as bounding boxes
        let boundingBoxList = this.world.getCollisionBoxes(this.boundingBox.expand(targetX, targetY, targetZ));

        // Move bounding box
        for (let aABB in boundingBoxList) {
            targetY = boundingBoxList[aABB].clipYCollide(this.boundingBox, targetY);
        }
        this.boundingBox.move(0.0, targetY, 0.0);

        for (let aABB in boundingBoxList) {
            targetX = boundingBoxList[aABB].clipXCollide(this.boundingBox, targetX);
        }
        this.boundingBox.move(targetX, 0.0, 0.0);

        for (let aABB in boundingBoxList) {
            targetZ = boundingBoxList[aABB].clipZCollide(this.boundingBox, targetZ);
        }
        this.boundingBox.move(0.0, 0.0, targetZ);

        this.onGround = originalTargetY !== targetY && originalTargetY < 0.0;

        // Stop motion on collision
        if (originalTargetX !== targetX) {
            this.motionX = 0.0;
        }
        if (originalTargetY !== targetY) {
            this.motionY = 0.0;
        }
        if (originalTargetZ !== targetZ) {
            this.motionZ = 0.0;
        }

        // Update position
        this.x = (this.boundingBox.minX + this.boundingBox.maxX) / 2.0;
        this.y = this.boundingBox.minY;
        this.z = (this.boundingBox.minZ + this.boundingBox.maxZ) / 2.0;

        // Horizontal collision?
        return originalTargetX !== targetX || originalTargetZ !== targetZ;
    }

    kill() {
        this.isDead = true;
    }

    isMoving() {
        return this.motionX !== 0.0
            || this.motionY !== 0.0 && !this.onGround
            || this.motionZ !== 0.0
            || this.rotationYaw !== this.prevRotationYaw
            || this.rotationPitch !== this.prevRotationPitch;
    }

    isSneaking() {
        return this.getFlag(1);
    }

    setSneaking(sneaking: boolean) {
        this.setFlag(1, sneaking);
    }

    updateMetaData(metaData: Entity['metaData']) {
        for (const [, value] of Object.entries<EntityMetadata>(metaData)) {
            this.metaData[value.id] = value;
        }
    }

    getFlag(flag: number) {
        return typeof this.metaData[0] !== "undefined" && (this.metaData[0].value & 1 << flag) !== 0;
    }

    setFlag(flag: number, value: boolean) {
        if (typeof this.metaData[0] === "undefined") {
            this.metaData[0] = {id: 0, type: 0, value: 0};
        }

        if (value) {
            this.metaData[0].value |= 1 << flag;
        } else {
            this.metaData[0].value &= ~(1 << flag);
        }
    }

}