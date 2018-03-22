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

vec4.set(RenderSystem.clearColor, 0.175, 0.175, 0.175, 1);

AssetSystem.load('pack://assets.pack')
  .then(packAsset => AssetSystem.fetchEngine = packAsset.makeFetchEngine())
  .then(() => AssetSystem.load('json://config.json'))
  .then(configAsset => AssetSystem.loadAll(configAsset.data.assets))
  .then(() => System.events.triggerLater(
    'change-scene',
    'scene://scenes/game.json'
  ));
