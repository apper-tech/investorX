export const GURU_COLUMNS = [
  { field: 'name', header: 'Guru Nickname' },
  { field: 'wallet', header: 'Wallet' },
  { field: 'votesCount', header: 'Votes' },
];


export class Guru {

  public wallet: string;
  public name: string;
  public votesCount: number;
  public isElectedByCurrentUser: boolean;

}
