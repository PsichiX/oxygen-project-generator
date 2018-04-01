import { lazyInitialization, System, vec4 } from 'oxygen-core';

lazyInitialization({
  render: { screen: 'screen-0' },
  asset: { fetchOptions: { cache: 'no-store' } },
  store: { id: 'oxygen-game' }
});

const {
  AssetSystem,
  RenderSystem,
  EntitySystem
} = System.systems;

// HERE YOU REGISTER CUSTOM COMPONENTS:
// EntitySystem.registerComponent('SomeController', SomeController.factory);

vec4.set(RenderSystem.clearColor, 0.175, 0.175, 0.175, 0);

(async () => {
  const packAsset = await AssetSystem.load('pack://assets.pack');
  AssetSystem.fetchEngine = packAsset.makeFetchEngine();
  const configAsset = await AssetSystem.load('json://config.json');
  await AssetSystem.loadAll(configAsset.data.assets);
  System.events.triggerLater('change-scene', 'scene://scenes/game.json');
})();
