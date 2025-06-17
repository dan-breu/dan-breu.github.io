# DanBreu

Theme base in [Ephesus Jekyll Theme](https://hakan.io)- 

Run local server:

```bash
$ bundle install
$ bundle exec jekyll build
$ bundle exec jekyll serve
```

Navigate to `127.0.0.1:4000`.

Tags are created automatically under the /tags page.

To use a math formula in a post, use the mathjax:true tag in the post.

## Contributing

Feel free to open a pull request for contributing.

Please feel free to contribute. Do not hesitate to open a pull request and fix it, please read [contributing](./CONTRIBUTING.md) before PR.

## License

This project is open source and available under the [MIT License](LICENSE.md).


# TBD
- [X] Change the logo when is dark or light
- [ ] Add colors for links



# Post Type

# Basic Post Types:
post_type: article     # → article (document icon)
post_type: project     # → rocket_launch (rocket icon)
post_type: image       # → image (image icon)
post_type: video       # → play_circle (play button)
post_type: tutorial    # → school (education icon)
post_type: news        # → newspaper (news icon)
post_type: code        # → code (code brackets)
post_type: resource    # → link (link icon)
# Default (no type)    # → description (document icon)

# Additional Options You Can Use:
post_type: blog        # → edit (pen icon)
post_type: portfolio   # → work (briefcase icon)
post_type: design      # → palette (color palette)
post_type: photo       # → photo_camera (camera icon)
post_type: music       # → music_note (music note)
post_type: podcast     # → mic (microphone)
post_type: book        # → menu_book (book icon)
post_type: tool        # → build (tool icon)
post_type: download    # → download (download arrow)
post_type: external    # → open_in_new (external link)
post_type: update      # → update (update icon)
post_type: announcement # → campaign (megaphone)
post_type: event       # → event (calendar icon)
post_type: research    # → science (flask icon)
post_type: guide       # → map (guide icon)
post_type: tip         # → lightbulb (lightbulb icon)

# To use in your post YAML front matter:
---
layout: post
title: "My Post Title"
date: 2023-12-01
post_type: project
---