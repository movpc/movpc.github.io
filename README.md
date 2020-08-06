# Notary Hub

## Setup

This site uses the static site generator Jekyll

1. Install a full [Ruby dev environment](https://jekyllrb.com/docs/installation/)
1. Clone this repo and `cd` into the root directory
1. Install Jekyll and gems: `gem install jekyll bundler`
1. Build and host locally: `./serve`

## Notes

- Built files are hosted in `docs/`
- `./serve` is just a small bash wrapper for `bundle exec jekyll serve`

## Resources

- [Docs for beautiful-jekyll-theme](bundle info --path beautiful-jekyll-theme)
- [How to override themes](https://jekyllrb.com/docs/themes/#overriding-theme-defaults)
- [Liquid template language docs](https://shopify.github.io/liquid/)