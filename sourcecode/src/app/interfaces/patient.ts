export interface Patient {
    radius: number;
    texture: number;
    perimeter: number;
    area: number;
    smoothness: number;
    name: string;
    id?:string;
    saved?:Boolean;
    result?:string;        
}
