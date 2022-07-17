// DarkPlasma_PositionDamageRate 1.0.1
// Copyright (c) 2020 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2020/10/24 1.0.1 修正不正常运转问题
 * 2020/10/23 1.0.0 问世
 */

/*:
 * @plugindesc 变动前排遭击打概率
 * @author DarkPlasma/<译>公孖。狼
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/DarkPlasma-MZ-Plugins/tree/release
 *
 * @param physicalDamageRates
 * @desc 物理遭击打概率。首位起按序对应。未指定则默认100、复数成员按实际指定值。
 * @text 物理遭击打概率(％)
 * @type number[]
 * @default ["100"]
 *
 * @param magicalDamageRates
 * @desc 魔法遭击打概率。首位起按序对应。未指定则默认100、复数成员按实际指定值。
 * @text 魔法遭击打概率(％)
 * @type number[]
 * @default ["100"]
 *
 * @help
 * version: 1.0.1
 * 变动前排站位角色(首位至某位)遭击打概率。
 */

(() => {
  'use strict';

  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });

  const pluginParameters = PluginManager.parameters(pluginName);

  const settings = {
    physicalDamageRates: JSON.parse(pluginParameters.physicalDamageRates || '["100"]').map((e) => {
      return Number(e || 0);
    }),
    magicalDamageRates: JSON.parse(pluginParameters.magicalDamageRates || '["100"]').map((e) => {
      return Number(e || 0);
    }),
  };

  const SPARAM_ID = {
    PHYSICAL_DAMAGE_RATE: 6,
    MAGICAL_DAMAGE_RATE: 7,
  };

  const _Game_Actor_sparam = Game_Actor.prototype.sparam;
  Game_Actor.prototype.sparam = function (sparamId) {
    const value = _Game_Actor_sparam.call(this, sparamId);
    if (sparamId === SPARAM_ID.PHYSICAL_DAMAGE_RATE) {
      return value * this.physicalDamageRateByPosition();
    }
    if (sparamId === SPARAM_ID.MAGICAL_DAMAGE_RATE) {
      return value * this.magicalDamageRateByPosition();
    }
    return value;
  };

  Game_Actor.prototype.physicalDamageRateByPosition = function () {
    const index = this.index();
    return (
      (settings.physicalDamageRates.length > index
        ? settings.physicalDamageRates[index]
        : settings.physicalDamageRates[settings.physicalDamageRates.length - 1]) / 100
    );
  };

  Game_Actor.prototype.magicalDamageRateByPosition = function () {
    const index = this.index();
    return (
      (settings.magicalDamageRates.length > index
        ? settings.magicalDamageRates[index]
        : settings.magicalDamageRates[settings.magicalDamageRates.length - 1]) / 100
    );
  };
})();