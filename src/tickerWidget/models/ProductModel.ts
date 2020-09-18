import { IProduct } from '../interfaces/products';

export class ProductModel {
  get baseAsset() {
    return this.props.b;
  }

  get quoteAsset() {
    return this.props.q;
  }

  get latestPrice() {
    return this.props.c;
  }

  // get change() {}

  public setLatestPrice(value: number) {
    this.props.c = value;
  }

  private constructor(private props: IProduct) {}

  public create(props: IProduct) {
    if (typeof props !== 'object') {
    }
    return new ProductModel(props);
  }
}
