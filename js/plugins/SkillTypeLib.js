//=============================================================================
// Plugin for RPG Maker MZ
// SkillTypeLib.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 特定条件下公开技能
 * @author 神無月サスケ/<译>公孖。狼
 *
 * @param passiveSkills
 * @text 被动技能
 * @desc 菜单可查看战斗中不出现技能类型ID
 * @type number[]
 * @default []
 *
 * @param superSpecialSkills
 * @text 超必杀技
 * @desc 战斗中TP满值(100)时激活发动条件技能类型ID
 * @type number[]
 * @default []
 *
 * @param doesDisplaySpecialOnMap
 * @parent superSpecialSkills
 * @text 超必杀技地图展示
 * @desc 超必杀技在地图菜单中陈列
 * @type boolean
 * @default true
 *
 * @help
 * 本插件为MZ专用。
 * 本插件可设定特定条件下公开展示的技能类型ID。
 *
 * ■概要
 * - 被动技能
 *  日常可查看、战斗中不出现。
 *  便于设定被动技能专有类别。
 * - 超必杀技
 *  战斗中、仅TP满值(通常为100)时激活发动条件。
 *  展示于战斗命令最上方。
 *  日常陈列与否可在「选项」中开关设定。
 *
 * ■许可公告
 * 本插件在遵循MIT许可下可自由利用。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SkillTypeLib';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const passiveStypeIds = parameters['passiveSkills'] || '[]';
  const specialStypeIds = parameters['superSpecialSkills'] || '[]';
  const specialOnMap = eval(parameters['doesDisplaySpecialOnMap'] || 'true');

  //
  // exclude passive skill and special attack skill
  //
  const _Window_ActorCommand_addCommand =
   Window_ActorCommand.prototype.addCommand;
  Window_ActorCommand.prototype.addCommand = function(name, symbol,
   enabled = true, ext = null) {
    if (symbol === 'skill') {
      if (passiveStypeIds.includes(String(ext))) {
        return;
      }
      if (specialStypeIds.includes(String(ext))) {
        return;
      }
    }
    _Window_ActorCommand_addCommand.call(this, name, symbol, enabled, ext);
  };

  //
  // display special attack skill at first when it's usable.
  //
  const _Window_ActorCommand_makeCommandList =
    Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
      this.addSpecialAttackCommands();
    }
    _Window_ActorCommand_makeCommandList.call(this);
  };

  Window_ActorCommand.prototype.addSpecialAttackCommands = function () {
    const skillTypes = this._actor.skillTypes();
    for (let i = 1; i <= $dataSystem.skillTypes.length; i++) {
      if (specialStypeIds.includes(String(i))) {
        if (this._actor.tp >= this._actor.maxTp()) {
          const name = $dataSystem.skillTypes[i];
          console.log(specialStypeIds, i, skillTypes, name);
          _Window_ActorCommand_addCommand.call(this, name, 'skill', true, i);
        }
      }
    }
  };

  //
  // whether to display special skill on map menu
  //
  const _Window_SkillType_addCommand = Window_SkillType.prototype.addCommand;
  Window_SkillType.prototype.addCommand = function(name, symbol,
   enabled = true, ext = null) {
    if (!specialOnMap && specialStypeIds.includes(String(ext))) {
      return;
    }
    _Window_SkillType_addCommand.call(this, name, symbol, enabled, ext);
  };

})();
