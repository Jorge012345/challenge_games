export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

abstract class ItemStrategy {
    protected readonly MAX_QUALITY = 50;
    protected readonly MIN_QUALITY = 0;

    constructor(protected item: Item) {}

    abstract update(): void;

    protected increaseQuality(amount: number = 1): void {
        this.item.quality = Math.min(this.MAX_QUALITY, this.item.quality + amount);
    }

    protected decreaseQuality(amount: number = 1): void {
        this.item.quality = Math.max(this.MIN_QUALITY, this.item.quality - amount);
    }
}

class NormalItemStrategy extends ItemStrategy {
    update(): void {
        this.decreaseQuality();
        this.item.sellIn--;
        if (this.item.sellIn < 0) {
            this.decreaseQuality();
        }
    }
}

class AgedBrieStrategy extends ItemStrategy {
    update(): void {
        this.increaseQuality();
        this.item.sellIn--;
        if (this.item.sellIn < 0) {
            this.increaseQuality();
        }
    }
}

class BackstagePassesStrategy extends ItemStrategy {
    update(): void {
        if (this.item.sellIn > 10) {
            this.increaseQuality();
        } else if (this.item.sellIn > 5) {
            this.increaseQuality(2);
        } else if (this.item.sellIn > 0) {
            this.increaseQuality(3);
        } else {
            this.item.quality = 0;
        }
        this.item.sellIn--;
    }
}

class SulfurasStrategy extends ItemStrategy {
    update(): void {
        // Sulfuras does not change in quality or sellIn
    }
}

class ConjuredItemStrategy extends ItemStrategy {
    update(): void {
        this.decreaseQuality(2);
        this.item.sellIn--;
        if (this.item.sellIn < 0) {
            this.decreaseQuality(2);
        }
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private getItemStrategy(item: Item): ItemStrategy {
        switch (item.name) {
            case 'Aged Brie':
                return new AgedBrieStrategy(item);
            case 'Backstage passes to a TAFKAL80ETC concert':
                return new BackstagePassesStrategy(item);
            case 'Sulfuras, Hand of Ragnaros':
                return new SulfurasStrategy(item);
            case 'Conjured':
                return new ConjuredItemStrategy(item);
            default:
                return new NormalItemStrategy(item);
        }
    }

    updateQuality(): Array<Item> {
        for (const item of this.items) {
            const strategy = this.getItemStrategy(item);
            strategy.update();
        }
        return this.items;
    }
}
