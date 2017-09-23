sass_vendors = _sass/vendors
sass_packages = egg-sass
# js_vendors = assets/js
# js_packages =
assets = assets/favicons assets/fonts assets/icons assets/images assets/scripts.js

all: serve install clean

install: clean
	bower install --config.directory=$(sass_vendors) $(sass_packages)
	# bower install --config.directory=$(js_vendors) $(js_packages)

css:
	sass -I _sass

serve:
	jekyll serve --config _config.yml --incremental

clean:
	rm -Rf $(sass_vendors)
	# rm -Rf $(js_vendors)
