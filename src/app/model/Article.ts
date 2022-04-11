export class Article {
  id = 0;
  description = '';
  price = 0;
  quantity = 0;
  position = 0;
  title = ""
  image = "";
  category = ""
  rating: { rate: number, count: number } = {
    rate: 0,
    count: 0
  }
}
