import { expect } from "chai";
import { HydrogenToVenus } from "../../../src/cards/venusNext/HydrogenToVenus";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from "../../../src/Game";
import { SelectCard } from '../../../src/inputs/SelectCard';
import { IProjectCard } from "../../../src/cards/IProjectCard";
import { ColonizerTrainingCamp } from '../../../src/cards/ColonizerTrainingCamp';
import { DeuteriumExport } from '../../../src/cards/venusNext/DeuteriumExport';

describe("HydrogenToVenus", function () {
    it("Should play", function () {
        const card = new HydrogenToVenus();
        const card2 = new DeuteriumExport();
        const card3 = new ColonizerTrainingCamp();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player,player], player);
        player.playedCards.push(card2, card3);
        expect(card.canPlay()).to.eq(true);
        const action = card.play(player, game)  as SelectCard<IProjectCard>;
        expect(action instanceof SelectCard).to.eq(true);
        action.cb([card2]);
        expect(player.getResourcesOnCard(card2)).to.eq(1);
        expect(game.getVenusScaleLevel()).to.eq(2);
    });
});