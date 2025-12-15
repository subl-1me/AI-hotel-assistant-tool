import Entity from './Entity';

export default interface Intent {
  entities: Entity[];
  intent: string;
  intent_confidence: number;
  text: string;
}
