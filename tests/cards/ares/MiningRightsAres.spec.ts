import { expect } from "chai";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from "../../../src/Game";
import { SelectSpace } from "../../../src/inputs/SelectSpace";
import { SpaceBonus } from "../../../src/SpaceBonus";
import { TileType } from "../../../src/TileType";
import { Resources } from "../../../src/Resources";
import { MiningRightsAres } from "../../../src/cards/ares/MiningRightsAres";

describe("MiningRightsAres", function () {
    let card : MiningRightsAres, player : Player, game : Game;

    beforeEach(function() {
        card = new MiningRightsAres();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Should play", function () {
        const action = card.play(player, game);
        expect(action instanceof SelectSpace).to.eq(true);

        const titaniumSpace = action.availableSpaces.find((space) => space.bonus.indexOf(SpaceBonus.TITANIUM) !== -1 && space.bonus.indexOf(SpaceBonus.STEEL) === -1);
        expect(titaniumSpace).not.to.eq(undefined);
        action.cb(titaniumSpace!);
        expect(titaniumSpace!.player).to.eq(player);
        expect(titaniumSpace!.tile && titaniumSpace!.tile!.tileType).to.eq(TileType.MINING_TITANIUM_BONUS);
        expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
        expect(titaniumSpace!.adjacency).to.deep.eq({bonus: [SpaceBonus.TITANIUM]});

        const steelSpace = action.availableSpaces.find((space) => space.bonus.indexOf(SpaceBonus.TITANIUM) === -1 && space.bonus.indexOf(SpaceBonus.STEEL) !== -1);
        expect(steelSpace).not.to.eq(undefined);
        action.cb(steelSpace!);
        expect(steelSpace!.player).to.eq(player);
        expect(steelSpace!.tile && steelSpace!.tile!.tileType).to.eq(TileType.MINING_STEEL_BONUS);
        expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
        expect(steelSpace!.adjacency).to.deep.eq({bonus: [SpaceBonus.STEEL]});
    });
});
