import {Client} from '../../../shared/models/Client';

export interface Record {
  recordId: number;
  date: Date;
  time: string;
  client: Client;
  status: string;
}


