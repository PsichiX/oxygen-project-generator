import { System, Component } from 'oxygen-core';

export class ExampleSystem extends System {

  doSomething() {
    console.log('* Example system did something!');
  }

  onRegister() {
    console.log('* Example system registered!');
  }

  onUnregister() {
    console.log('* Example system unregistered!');
  }

}

export class ExampleComponent extends Component {

  static factory() {
    return new ExampleComponent();
  }

  onAttach() {
    const { ExampleSystem } = System.systems;
    ExampleSystem.doSomething();
  }

}

export function initializePlugin() {
  System.register('ExampleSystem', new ExampleSystem());

  const { EntitySystem } = System.systems;
  EntitySystem.registerComponent('ExampleComponent', ExampleComponent.factory);
}
