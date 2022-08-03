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
 * @param ItemID
 * @desc Item to check
 * @default 0
 * 
 * @param ItemNum
 * @desc Item num required
 * @default 0
 *
 */
var CheckSingleItemRequired = function (id, num) {
    if ($gameParty.numItems($dataItems[id]) >= num) {
        return true;
    } else {
        return false;
    }
}

var CheckItemListRequired = function (items) {
    let str = items;
    var arr = str.split('|');
    for (var i = 0; i < arr.length; i++)
    {
        var arr1 = arr[i].split(',');
        if ($gameParty.numItems($dataItems[arr1[0]]) < arr1[1]) {
            return false;
        }
    }
    return true;
}