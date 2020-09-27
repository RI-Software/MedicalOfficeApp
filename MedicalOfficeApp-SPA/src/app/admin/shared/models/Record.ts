import {Client} from '../../../shared/models/Client';

export interface Record {
  recordId: number;
  date: Date;
  time: number;
  client: Client;
}


