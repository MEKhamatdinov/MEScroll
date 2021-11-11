# MEScroll
Injects CSS features for scrolling

## Usage
1. Insert script into your page.
2. Set `data-mescroll` on container where you will animate elements
2. Use css custom properties --mescroll-*

## CSS Properties
| Property | Unit | Default | Description |
|-|-|-|-|
|--mescroll-value| - | readonly | Value of scroll through container in from 0 to 1|
|--mescroll-percent| - | readonly | Value of scroll through container in percents |
|--mescroll-allow-overscroll| - | false | allows passing scroll value over 100% |
|--mescroll-reverse| boolean | false | reverse scroll value to 100% - 0% |
|--mescroll-offset| % | 0% | disposes start point of scroll animation. 0% - bottom, 100% - top |
|--mescroll-range| % | 0% | sets end point of animation. 0% - bottom, 100% - top |

[Example](demo)
