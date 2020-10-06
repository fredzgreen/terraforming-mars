import { expect } from "chai";

import { AresSpaceBonus } from "../../../src/ares/AresSpaceBonus";
import { SolarFarm } from "../../../src/cards/ares/SolarFarm";
import { Color } from "../../../src/Color";
import { Game } from "../../../src/Game";
import { SelectSpace } from "../../../src/inputs/SelectSpace";
import { Player } from "../../../src/Player";
import { Resources } from "../../../src/Resources";
import { SpaceBonus } from "../../../src/SpaceBonus";
import { TileType } from "../../../src/TileType";
import { ARES_OPTIONS_WITH_HAZARDS } from "../../ares/AresTestHelper";

describe("SolarFarm", function () {
    let card: SolarFarm, player: Player, game: Game;

    beforeEach(function () {
        card = new SolarFarm();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player, ARES_OPTIONS_WITH_HAZARDS);
    });

    it("Play", function () {
        // Find the first spot to place a city.
        var space = game.board.getAvailableSpacesForCity(player)[0];
        // Hack the space to have a large number of plants, just to show a matching
        // energy production bump - seven.
        space.bonus = [
            SpaceBonus.PLANT,
            SpaceBonus.PLANT,
            SpaceBonus.PLANT,
            SpaceBonus.PLANT,
            SpaceBonus.PLANT,
            SpaceBonus.PLANT,
            SpaceBonus.PLANT,
        ];

        const action = card.play(player, game);

        expect(action instanceof SelectSpace).to.eq(true);

        expect(player.getProduction(Resources.ENERGY)).eq(0);
        const citySpace = game.board.getAvailableSpacesOnLand(player).filter(s => s.tile?.hazard !== true)[0];
        action.cb(citySpace);
        expect(citySpace.player).to.eq(player);
        expect(citySpace.tile!.tileType).to.eq(TileType.SOLAR_FARM);
        expect(citySpace.adjacency).to.deep.eq({
            bonus: [AresSpaceBonus.POWER, AresSpaceBonus.POWER],
        });
        expect(player.getProduction(Resources.ENERGY)).eq(7);
    });
});
