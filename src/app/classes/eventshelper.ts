
// Events cannot work if Web3 v1 and Ganache 6 used:
// https://ethereum.stackexchange.com/questions/58072/watching-solidity-event-gives-error-typeerror-watch-is-not-a-function/66022#66022
// TODO: Use to Ganache 7 when it is stable
// export class EventsHelper {

//     static awaitEvent(event, handler) {
//         return new Promise((resolve, reject) => {
//             function wrappedHandler(...args) {
//                 Promise.resolve(handler(...args)).then(resolve).catch(reject);
//             }

//             event.watch(wrappedHandler);
//         });
//     }

//     static async listen(event, customHandler) {
//         //let event = bounty.TargetCreated({});

//         const watcher = async function (err, result) {
//             event.stopWatching();
//             if (err) { throw err; }

//             //  const argumentValue = result.args.eventArgumentName;
//             // Write custom logic
//             customHandler(result.args);
//         };
//         // Write some logic
//         await EventsHelper.awaitEvent(event, watcher);
//     }

// }
