/**
 * User Model
 * @module Models
 * version 1.0
 */



   export const BodaoEndPoint = {
      IPlugins: 'plugins'
    } as const;
    
   export type BodaoEndPoint_t = typeof BodaoEndPoint[keyof typeof  BodaoEndPoint]