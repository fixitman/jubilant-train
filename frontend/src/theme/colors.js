/* Coolors Exported Palette - https://coolors.co/23432e-3f7853-46a667-d4eddd-f5e3df-f8f5f1-faefe1-ebe2d6-b18d59-564424 */
/* Export as CSS too and add to App.css */

const coolorsColors = JSON.parse('{"Phthalo Green":"23432e","Amazon":"3f7853","GO Green":"46a667","Honeydew":"d4eddd","Misty Rose":"f5e3df","Isabelline":"f8f5f1","Linen":"faefe1","Bone":"ebe2d6","Camel":"b18d59","Cafe Noir":"564424"}')

const keys = Object.keys(coolorsColors)
const colors = {}

keys.forEach((key) => {
    colors[key] = `#${coolorsColors[key]}`
})

export default colors

