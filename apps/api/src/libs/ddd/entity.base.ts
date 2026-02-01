export abstract class Entity<Props> {
  protected readonly _id: number;
  protected props: Props;

  constructor(props: Props, id?: number) {
    this._id = id ? id : 0;
    this.props = props;
  }

  get id(): number {
    return this._id;
  }

  public getProps(): Props {
    return { ...this.props };
  }
}
