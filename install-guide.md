https://jekyll-themes.com/sujaykundu777/devlopr-jekyll

###Install Ruby

#### For Linux

```bash
sudo apt install ruby-full
ruby --version

> ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux-gnu]

gem install jekyll bundler

# npm install
bundle update
bundle install

> jekyll 4.2.2

# Server Run
# Or --watch
bundle exec jekyll serve --livereload
```

#### For Windows

```bash
ruby -v 
> (ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [universal.x86_64-darwin21])

gem install jekyll bundler

bundler -v
> Bundler version 2.3.23

# npm install
bundle update
bundle install

> jekyll 4.2.2

# Server Run
# Or --watch
bundle exec jekyll serve --livereload 
```