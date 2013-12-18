/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2013 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Tile set is a combination of an image containing the tiles and collision data per tile.
* You should not normally instantiate this class directly.
*
* @class Phaser.Tileset
* @constructor
* @param {string} name - The name of the tileset in the map data.
* @param {number} tileWidth - Width of each tile in pixels.
* @param {number} tileHeight - Height of each tile in pixels.
* @param {number} tileMargin - The amount of margin around the tilesheet.
* @param {number} tileSpacing - The amount of spacing between each tile in the sheet.
* @param {number} rows - How many tiles are placed horizontally in each row.
* @param {number} columns - How many tiles are placed vertically in each column.
* @param {number} total - The maximum number of tiles to extract from the image.
*/
Phaser.Tileset = function (name, firstgid, width, height, margin, spacing, properties) {

    /**
    * @property {string} name - The name of the Tileset.
    */
    this.name = name;

    /**
    * @property {number} firstgid - The Tiled firstgid value.
    * @default
    */
    this.firstgid = firstgid;

    /**
    * @property {number} tileWidth - The width of a tile in pixels.
    */
    this.tileWidth = width;

    /**
    * @property {number} tileHeight - The height of a tile in pixels.
    */
    this.tileHeight = height;

    /**
    * @property {number} tileMargin - The margin around the tiles in the sheet.
    */
    this.tileMargin = margin;

    /**
    * @property {number} tileSpacing - The margin around the tiles in the sheet.
    */
    this.tileSpacing = spacing;

    /**
    * @property {object} properties - Tileset specific properties (typically defined in the Tiled editor).
    */
    this.properties = properties;

    /**
    * @property {object} tilePproperties - Tile specific properties (typically defined in the Tiled editor).
    */
    this.tileProperties = {};

    /**
    * @property {string} key - The cache ID.
    */
    // this.key = key;

    /**
    * @property {object} image - The image used for rendering.
    */
    this.image = null;

    /**
    * @property {number} rows - The number of rows in the tile sheet.
    */
    this.rows = 0;

    /**
    * @property {number} columns - The number of columns in the tile sheet.
    */
    this.columns = 0;

    /**
    * @property {number} total - The total number of tiles in the tilesheet.
    */
    this.total = 0;

    /**
    * @property {array} tiles - An array of the tile data.
    */
    // this.tiles = [];

    // this.build();



}

Phaser.Tileset.prototype = {

    /**
    * Builds the tileset data.
    *
    * @method Phaser.Tileset#build
    */
    build: function () {

        var x = this.tileMargin;
        var y = this.tileMargin;

        var count = 0;
        var countX = 0;
        var countY = 0;

        console.log('Building tileset', this.rows, 'x', this.columns, 'total', this.total);

        // for (var i = this.firstgid; i < this.firstgid + this.total; i++)
        for (var i = 0; i < this.total; i++)
        {
            //  Can add extra properties here as needed
            this.tiles[i] = [x, y];

            x += this.tileWidth + this.tileSpacing;

            count++;

            if (count === this.total)
            {
                break;
            }

            countX++;

            if (countX === this.rows)
            {
                x = this.tileMargin;
                y += this.tileHeight + this.tileSpacing;

                countX = 0;
                countY++;

                if (countY === this.columns)
                {
                    break;
                }
            }
        }

        console.table(this.tiles);

    },

    /**
    * Gets a Tile from this set.
    *
    * @method Phaser.Tileset#getTile
    * @param {number} index - The index of the tile within the set.
    * @return {object} The tile object.
    */
    getTile: function (index) {

        return this.tiles[index];

    },

    /**
    * Gets a Tile from this set.
    *
    * @method Phaser.Tileset#getTileX
    * @param {number} index - The index of the tile within the set.
    * @return {object} The tile object.
    */
    getTileX: function (index) {

        return this.tiles[index][0];

    },

    /**
    * Gets a Tile from this set.
    *
    * @method Phaser.Tileset#getTileY
    * @param {number} index - The index of the tile within the set.
    * @return {object} The tile object.
    */
    getTileY: function (index) {

        return this.tiles[index][1];

    },

    /**
    * Sets tile spacing and margins.
    *
    * @method Phaser.Tileset#setSpacing
    * @param {number} [tileMargin] - The margin around the tiles in the sheet.
    * @param {number} [tileSpacing] - The spacing between the tiles in the sheet.
    */
    setSpacing: function (margin, spacing) {

        this.tileMargin = margin;
        this.tileSpacing = spacing;

    },

    /**
    * Checks if the tile at the given index can collide.
    *
    * @method Phaser.Tileset#canCollide
    * @param {number} index - The index of the tile within the set.
    * @return {boolean} True or false depending on the tile collision or null if no tile was found at the given index.
    canCollide: function (index) {

        if (this.tiles[index])
        {
            return this.tiles[index].collideNone;
        }

        return null;

    },
    */

    /**
    * Checks if the tile at the given index exists.
    *
    * @method Phaser.Tileset#checkTileIndex
    * @param {number} index - The index of the tile within the set.
    * @return {boolean} True if a tile exists at the given index otherwise false.
    */
    checkTileIndex: function (index) {

        return (this.tiles[index]);

    },

    /**
    * Sets collision values on a range of tiles in the set.
    *
    * @method Phaser.Tileset#setCollisionRange
    * @param {number} start - The index to start setting the collision data on.
    * @param {number} stop - The index to stop setting the collision data on.
    * @param {boolean} left - Should the tile collide on the left?
    * @param {boolean} right - Should the tile collide on the right?
    * @param {boolean} up - Should the tile collide on the top?
    * @param {boolean} down - Should the tile collide on the bottom?
    setCollisionRange: function (start, stop, left, right, up, down) {

        if (this.tiles[start] && this.tiles[stop] && start < stop)
        {
            for (var i = start; i <= stop; i++)
            {
                this.tiles[i].setCollision(left, right, up, down);
            }
        }

    },
    */

    /**
    * Sets collision values on a tile in the set.
    *
    * @method Phaser.Tileset#setCollision
    * @param {number} index - The index of the tile within the set.
    * @param {boolean} left - Should the tile collide on the left?
    * @param {boolean} right - Should the tile collide on the right?
    * @param {boolean} up - Should the tile collide on the top?
    * @param {boolean} down - Should the tile collide on the bottom?
    setCollision: function (index, left, right, up, down) {

        if (this.tiles[index])
        {
            this.tiles[index].setCollision(left, right, up, down);
        }

    }
    */

}

/**
* @name Phaser.Tileset#total
* @property {number} total - The total number of tiles in this Tileset.
* @readonly
*/
Object.defineProperty(Phaser.Tileset.prototype, "XXXtotal", {

    get: function () {
        return this.tiles.length;
    }

});
