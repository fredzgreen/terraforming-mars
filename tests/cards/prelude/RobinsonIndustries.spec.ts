import { expect } from "chai";
import { RobinsonIndustries } from "../../../src/cards/prelude/RobinsonIndustries";
import { Color } from "../../../src/Color";
import { Game } from "../../../src/Game";
import { OrOptions } from "../../../src/inputs/OrOptions";
import { Player } from "../../../src/Player";
import { Resources } from "../../../src/Resources";

describe("RobinsonIndustries", function () {
    let card : RobinsonIndustries, player : Player, game : Game;

    beforeEach(function() {
        card = new RobinsonIndustries();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player], player);
        player.corporationCard = card;
    });

    it("Can't act", function () {
        player.megaCredits = 3;
        expect(card.canAct(player)).to.eq(false);
    });

    it("Can act", function () {
        player.megaCredits = 4;
        expect(card.canAct(player)).to.eq(true);

        const result = card.action(player, game) as OrOptions;
        expect(result.options.length).to.eq(6);

        result.options[1].cb();
        expect(player.getProduction(Resources.STEEL)).to.eq(1);
        expect(player.megaCredits).to.eq(0);
    });

    it("Only allows to choose from lowest production(s)", function () {
        player.setProduction(Resources.MEGACREDITS, -1);
        let result = card.action(player, game) as OrOptions;
        expect(result.options.length).to.eq(1);

        player.setProduction(Resources.MEGACREDITS, 5);
        player.setProduction(Resources.TITANIUM, 1);
        player.setProduction(Resources.PLANTS, 2);

        result = card.action(player, game) as OrOptions;
        expect(result.options.length).to.eq(3);
    });
});
