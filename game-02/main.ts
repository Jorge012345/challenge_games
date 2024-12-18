import { Item, GildedRose } from './gilded-rose';

const items = [
    new Item('Aged Brie', 10, 20),
    new Item('Backstage passes to a TAFKAL80ETC concert', 15, 30),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Conjured', 3, 6),
    new Item('Normal Item', 5, 10),
];

const gildedRose = new GildedRose(items);

console.log("Día 0", gildedRose.items);
for (let day = 1; day <= 5; day++) {
    gildedRose.updateQuality();
    console.log(`Día ${day}`, gildedRose.items);
}