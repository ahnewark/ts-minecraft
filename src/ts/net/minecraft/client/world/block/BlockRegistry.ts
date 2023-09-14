import BlockLog from "../../../../../../js/net/minecraft/client/world/block/type/BlockLog.js";
import BlockStone from "../../../../../../js/net/minecraft/client/world/block/type/BlockStone.js";
import BlockGrass from "../../../../../../js/net/minecraft/client/world/block/type/BlockGrass.js";
import BlockDirt from "../../../../../../js/net/minecraft/client/world/block/type/BlockDirt.js";
import BlockLeave from "../../../../../../js/net/minecraft/client/world/block/type/BlockLeave.js";
import BlockWater from "../../../../../../js/net/minecraft/client/world/block/type/BlockWater.js";
import BlockSand from "../../../../../../js/net/minecraft/client/world/block/type/BlockSand.js";
import BlockTorch from "../../../../../../js/net/minecraft/client/world/block/type/BlockTorch.js";
import Sound from "../../../../../../js/net/minecraft/client/world/block/sound/Sound.js";
import Block from "../../../../../../js/net/minecraft/client/world/block/Block.js";
import BlockWood from "../../../../../../js/net/minecraft/client/world/block/type/BlockWood.js";
import BlockBedrock from "../../../../../../js/net/minecraft/client/world/block/type/BlockBedrock.js";
import BlockGlass from "../../../../../../js/net/minecraft/client/world/block/type/BlockGlass.js";
import SoundGlass from "../../../../../../js/net/minecraft/client/world/block/sound/SoundGlass.js";
import BlockGravel from "../../../../../../js/net/minecraft/client/world/block/type/BlockGravel.js";
import BlockCobblestone from "../../../../../../js/net/minecraft/client/world/block/type/BlockCobblestone.js";

export class BlockRegistry {

    public static STONE: BlockStone;
    public static GRASS: BlockGrass;
    public static DIRT: BlockDirt;
    public static COBBLE_STONE: BlockCobblestone;
    public static WOOD: BlockWood;
    public static BEDROCK: BlockBedrock;
    public static GRAVEL: BlockGravel;
    public static LOG: BlockLog;
    public static LEAVE: BlockLeave;
    public static GLASS: BlockGlass
    public static WATER: BlockWater;
    public static SAND: BlockSand;
    public static TORCH: BlockTorch;


    static create() {
        // Sounds
        Block.sounds.stone = new Sound("stone", 1.0);
        Block.sounds.wood = new Sound("wood", 1.0);
        Block.sounds.gravel = new Sound("gravel", 1.0);
        Block.sounds.grass = new Sound("grass", 1.0);
        Block.sounds.cloth = new Sound("cloth", 1.0);
        Block.sounds.sand = new Sound("sand", 1.0);
        Block.sounds.glass = new SoundGlass("stone", 1.0);

        // Blocks
        BlockRegistry.STONE = new BlockStone(1, 0);
        BlockRegistry.GRASS = new BlockGrass(2, 1);
        BlockRegistry.DIRT = new BlockDirt(3, 2);
        BlockRegistry.COBBLE_STONE = new BlockCobblestone(4, 14);
        BlockRegistry.WOOD = new BlockWood(5, 10);
        BlockRegistry.BEDROCK = new BlockBedrock(7, 11);
        BlockRegistry.GRAVEL = new BlockGravel(13, 13);
        BlockRegistry.LOG = new BlockLog(17, 4);
        BlockRegistry.LEAVE = new BlockLeave(18, 6);
        BlockRegistry.GLASS = new BlockGlass(20, 12);
        BlockRegistry.WATER = new BlockWater(9, 7);
        BlockRegistry.SAND = new BlockSand(12, 8)
        BlockRegistry.TORCH = new BlockTorch(50, 9)
    }
}