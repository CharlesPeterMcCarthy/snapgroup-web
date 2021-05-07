// export interface Snap {
//     snapId: string;
//     imageUrl: string;
//     username: string;
//     time: string;
//     seenBy: string[];
// }

export class Snap {

    public snapId: string;
    public imageUrl: string;
    public username: string;
    public time: string;
    public seenBy: string[];

    public constructor(json) {
        Object.assign(this, json);
    }

}
