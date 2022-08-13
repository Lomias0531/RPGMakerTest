//=============================================================================
// AsyncWait
//=============================================================================
/*:
 * @plugindesc This plugin offer a function to make an async waiting.
 * @author BreadJI
 *
 * @help
 *
 *
 * functions list:
 *      waitingFor(time);
 *
 * @param time
 * @type number
 * @desc
 * @default 0
 *
 */// JavaScript source code
async function waitingFor(time) {
    var x = await f1(time);
}
function f1(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, x);
    });
}