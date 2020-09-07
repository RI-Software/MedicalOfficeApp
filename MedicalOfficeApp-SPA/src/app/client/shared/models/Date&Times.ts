export interface AvailableDate {
  date: Date;
  status: 'Free' | 'Busy';
}

export interface AvailableTime {
  time: string;
  status?: 'Free' | 'InProcess' | 'Taken' | 'Expired';
}

export interface DateTime {
  date: string;
  time: string;
}
