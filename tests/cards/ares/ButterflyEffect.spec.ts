import { Color } from "../../../src/Color";
import { Game } from "../../../src/Game";
import { Player } from "../../../src/Player";
import { ButterflyEffect } from "../../../src/cards/ares/ButterflyEffect";

describe("ButterflyEffect", function () {
    let card: ButterflyEffect, player: Player, game: Game;

    beforeEach(function () {
        card = new ButterflyEffect();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    // TODO(kberg): implement
    it("Placeholder test", function () {
        card.play(player, game);
    });
});
