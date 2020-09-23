import { expect } from "chai";
import { AresSpaceBonus } from "../../../src/ares/AresSpaceBonus";
import { OceanSanctuary } from "../../../src/cards/ares/OceanSanctuary";
import { Color } from "../../../src/Color";
import { Game } from "../../../src/Game";
import { Player } from "../../../src/Player";
import { SpaceType } from "../../../src/SpaceType";
import { TileType } from "../../../src/TileType";
import { AresTestHelper, ARES_GAME_OPTIONS } from "../../ares/AresTestHelper";
import { AresHandler } from "../../../src/ares/AresHandler";

describe("OceanSanctuary", function () {
  let card : OceanSanctuary, player : Player, otherPlayer: Player, game : Game;

  beforeEach(function() {
    card = new OceanSanctuary();
    player = new Player("test", Color.BLUE, false);
    otherPlayer = new Player("test", Color.RED, false);
    game = new Game("foobar", [player, otherPlayer], player, ARES_GAME_OPTIONS);
  });

  it("Can play", function () {
    AresTestHelper.addOcean(game, player);
    expect(card.canPlay(player, game)).is.false;

    AresTestHelper.addOcean(game, player);
    expect(card.canPlay(player, game)).is.false;

    AresTestHelper.addOcean(game, player);
    expect(card.canPlay(player, game)).is.false;

    AresTestHelper.addOcean(game, player);
    expect(card.canPlay(player, game)).is.false;

    AresTestHelper.addOcean(game, player);
    expect(card.canPlay(player, game)).is.true;
  });

  it("Play", function () {
    const oceanSpace = AresTestHelper.addOcean(game, player);
    const action = card.play(player, game);
    action.cb(oceanSpace);
    expect(oceanSpace.player).to.eq(player);
    expect(oceanSpace.tile!.tileType).to.eq(TileType.OCEAN_SANCTUARY);
    expect(oceanSpace.adjacency).to.deep.eq({ bonus: [AresSpaceBonus.ANIMAL] });
  });


  it("Effect", function() {
    card.resourceCount = 4;

    expect(card.canAct(player, game)).is.true;
    card.action(player, game);

    expect(card.resourceCount).eq(5);
  });

  it("Ocean Sanctuary counts as ocean for adjacency", function() {
    const oceanSpace = AresTestHelper.addOcean(game, player);
    const action = card.play(player, game);
    action.cb(oceanSpace);
    var greenery = game.board.getAdjacentSpaces(oceanSpace).filter(space => space.spaceType === SpaceType.LAND)[0];

    expect(otherPlayer.megaCredits).eq(0);

    game.addGreenery(otherPlayer, greenery.id);

    expect(otherPlayer.megaCredits).eq(2);
  });

  it("Victory Points", function() {
    card.resourceCount = 7;
    expect(card.getVictoryPoints()).eq(7);
  });

});
