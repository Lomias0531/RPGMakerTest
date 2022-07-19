//=============================================================================
// TestPlugin.js
//=============================================================================

/*:
 * @plugindesc Test plugin
 * @author Lomias
 *
 * @help
 *
 * HELP!!!!
 *
 */
var Add_Buff = function (buff, strength) {

}
class ThisBuff {
    
}

Game_Action.prototype.makeDamageValue = function (target, critical) {
    const item = this.item();
    const baseValue = this.evalDamageFormula(target);
    let value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};