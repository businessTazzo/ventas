export type UssdDataAddType = "front" | "plugin" | "form";
export type UssdDataType = "front" | "plugin";
export type UssdPluginsType = "form" | "link";
type UssdPluginsParameterType = "in" | "out" | "none";

// import { Position } from "@jsplumb/core";
// export default interface UssdData extends Partial<Position> {}

export interface UssdData {
    id: string; //explicit
    type: UssdDataType; //explicit (front, plugin)
    title?: string; //Optional
    description?: string; //Optional
    tag?: string; //Optional solo el de inicio

    ismenu: boolean; //explicit
    volatile: boolean; //explicit

    count?: boolean; //Optional
    hist?: string; //Optional
    nav?: string; //Optional

    textIncl?: UssdTextIncl; //Optional
    menu?: UssdMenu[]; //Optional
    plugin?: UssdPlugin; //Optional

    //Para la posicion del Item y Aspecto
    top?: number,
    left?: number,
    color?: string;
    icon?: string;
    level?: number;
}

export interface UssdTextIncl {
    incl: string; //explicit
    inclCode?: string; //Optional
    Links?: string[]; //Optional
}

export interface UssdMenu {
    name: string; //explicit
    link: string; //explicit
    key?: string; //Optional
}

export interface UssdPlugin {
    id: string;  //explicit
    type: UssdPluginsType; //explicit (form, link)
    host: string; //explicit
    service: string; //explicit
    module: string; //explicit
    parameters: UssdPluginsParameter[]; //explicit
    version?: string; //Optional
}

export interface UssdPluginsParameter {
    order: number; //explicit
    type: UssdPluginsParameterType;  //explicit //in, out, none
    value?: string; //explicit
    path?: string; //Optional
    link?: string; //Optional
}
