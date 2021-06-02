import { Flavor, Icon } from '@icon-magic/icon-models';
import * as assert from 'assert';
import * as fs from 'fs-extra';
import * as path from 'path';

import { svgLightDark } from '../src/plugins/svg-light-dark';

const FIXTURES = path.resolve(__dirname, '..', '..', 'test', 'fixtures');

const lightFile = fs.readFileSync(
  path.resolve(`${FIXTURES}/entity-ghosts/group/accent-1.svg`).toString(), 'utf-8'
);

const darkFile = fs.readFileSync(
  path.resolve(`${FIXTURES}/entity-ghosts/group/accent-1-on-dark.svg`).toString(), 'utf-8'
);

const lightFlavor: Flavor = new Flavor(`${FIXTURES}/entity-ghosts/group/accent-1.svg`, {
  name: 'accent-1',
  contents: lightFile,
  path: `${FIXTURES}/entity-ghosts/group/accent-1.svg`,
  imageset: 'accent-1',
  colorScheme: 'light'
});

const darkFlavor: Flavor = new Flavor(`${FIXTURES}/entity-ghosts/group/accent-1-on-dark.svg`, {
  name: 'accent-1-on-dark',
  contents: darkFile,
  path: `${FIXTURES}/entity-ghosts/group/accent-1-on-dark.svg`,
  imageset: 'accent-1',
  colorScheme: 'dark'
});

const icon = new Icon({
  iconPath: `${FIXTURES}/out/group`,
  variants: [
    {
      path: `${FIXTURES}/entity-ghosts/group/accent-1.svg`,
      name: 'accent-1',
      imageset: 'accent-1',
      colorScheme: 'light'
    },
    {
      path: `${FIXTURES}/entity-ghosts/group/accent-1-on-dark.svg`,
      name: 'accent-1-on-dark',
      imageset: 'accent-1',
      colorScheme: 'dark'
    }
  ],
  sizes: [128],
  resolutions: [1, 2],
  outputPath: `/${FIXTURES}/out`,
  iconName: 'group',
  sourceConfigFile: `${FIXTURES}/entity-ghosts/group/iconrc.json`,
  flavors: [
    {
      "name": "accent-1-on-dark",
      "path": "./build/accent-1-on-dark.svg",
      "imageset": "accent-1",
      "colorScheme": "dark",
      "types": {}
    },
    {
      "name": "accent-1",
      "path": "./build/accent-1.svg",
      "imageset": 'accent-1',
      "colorScheme": 'light',
      "types": {}
    }
  ]
});

describe('svgLightDark()', function () {
  it('creates parent svg with light and dark children svgs when `imageSet` exists and the `colorScheme` equals `dark`', async () => {
    const outputSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128" viewBox="0 0 128 128">
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" display="var(--svg-light-display)">
    <path fill="#e9e5de" d="M0 0h128v128H0z"/>
    <path fill="#e9e5de" d="M0 64.14h128V128H0z"/>
    <path d="M32 64H0v32a32 32 0 0032-32zm64 0a32 32 0 0032 32V64zM64 96a32 32 0 0032-32H32a32 32 0 0032 32zM32 64H0V32a32.06 32.06 0 0132 32zm64 0a32.06 32.06 0 0132-32v32zM64 32a32.06 32.06 0 0132 32H32a32.06 32.06 0 0132-32z" fill="#e9e5de"/>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" display="var(--svg-dark-display)">
    <path fill="#eee" d="M0 0h128v128H0z"/>
    <path fill="#eee" d="M0 64.14h128V128H0z"/>
    <path d="M32 64H0v32a32 32 0 0032-32zm64 0a32 32 0 0032 32V64zM64 96a32 32 0 0032-32H32a32 32 0 0032 32zM32 64H0V32a32.06 32.06 0 0132 32zm64 0a32.06 32.06 0 0132-32v32zM64 32a32.06 32.06 0 0132 32H32a32.06 32.06 0 0132-32z" fill="#eee"/>
  </svg>
</svg>`;

  const outputFlavor: Flavor = await svgLightDark.fn(darkFlavor, icon, {
    lightToken: "var(--svg-light-display)",
    darkToken: "var(--svg-dark-display)"
    });

    assert.equal(await outputFlavor.getContents(), outputSvg);
    assert.notEqual(await outputFlavor.getContents(), darkFile);

  });

  it('returns original flavor with no changes when `colorScheme` dos not equal `dark`', async () => {
    const outputFlavor: Flavor = await svgLightDark.fn(lightFlavor, icon, {
      lightToken: "var(--svg-light-display)",
      darkToken: "var(--svg-dark-display)"
    });

    assert.equal(await outputFlavor.getContents(), lightFile);
  });

  // it('creates parent svg with width, height, and viewbox', async () => {
  //   const outputFlavor: Flavor = await svgLightDark.fn(darkFlavor, icon, {
  //     lightToken: "var(--svg-light-display)",
  //     darkToken: "var(--svg-dark-display)"
  //     });

  //     console.log(await outputFlavor.getContents().width);
  // });

  // it('creates light and dark svgs with display property from config', async () => {
  //   const outputFlavor: Flavor = await svgLightDark.fn(darkFlavor, icon, {
  //     lightToken: "var(--svg-light-display)",
  //     darkToken: "var(--svg-dark-display)"
  //     });
  // });

  // it('creates light and dark svgs with display property even if tags not passed from config', async () => {
  //   const outputFlavor: Flavor = await svgLightDark.fn(darkFlavor, icon, {
  //     lightToken: "var(--svg-light-display)",
  //     darkToken: "var(--svg-dark-display)"
  //     });
  // });

});
