/* -----------------------------------------------------------------------------------
* Mini LightBox v2.0 - Compact and Lightweight Lightbox.
* <http://code.google.com/p/mini-lightbox/>
* By Jorge Moreno <http://moro.es> <http://alterebro.com>
* Copyright (c) 2011 - 2019 Jorge Moreno
* Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
* -----------------------------------------------------------------------------------
*/

const ImageLoader = function(url) {

	this.url = url;
	this.image = null;
	this.loadevent = null;
	this.load = function () {

		this.image = document.createElement('img');
		this.image.addEventListener('load', () => { this.loadevent(this.url, this.image); });
		this.image.addEventListener('error', () => {

			MiniLightbox.close();
			window.alert('Error loading image: ' + this.url);
		});
		this.image.src = this.url;
	};
}

const MiniLightbox = {

	guid: 'mlbx_' + String(Math.random().toFixed(6)).substring(2),
	modal : {},

	create() {

		let mlbx = document.createElement('div');
			mlbx.id = this.guid;
			mlbx.className = 'mlbx';
			mlbx.addEventListener('click', () => { MiniLightbox.close(); });

		let mlbx_fig = document.createElement('figure');
			mlbx_fig.className = 'mlbx_fig';

		let mlbx_img = document.createElement('img');
			mlbx_img.className = 'mlbx_img';

		let mlbx_txt = document.createElement('figcaption');
			mlbx_txt.className = 'mlbx_txt';

		let mlbx_cls = document.createElement('div');
			mlbx_cls.className = 'mlbx_cls';
			mlbx_cls.addEventListener('click', () => { MiniLightbox.close(); });

		this.modal = { mlbx, mlbx_fig, mlbx_img, mlbx_txt, mlbx_cls };

		mlbx.appendChild( mlbx_fig );
		mlbx_fig.appendChild( mlbx_img );
		mlbx_fig.appendChild( mlbx_txt );
		mlbx_fig.appendChild( mlbx_cls );
		document.body.appendChild(mlbx);
	},

	open(image_path, text) {

		this.modal.mlbx.classList.add('loading');

		let loader = new ImageLoader(image_path);
			loader.loadevent = (url, image) => {

				this.modal.mlbx.classList.remove('loading');
				this.modal.mlbx_img.src = image_path;
				this.modal.mlbx_txt.innerHTML = text;
				this.modal.mlbx_fig.style.marginLeft = `-${Math.round(image.width / 2)}px`;
				this.modal.mlbx_fig.style.marginTop = `-${Math.round(image.height / 2)}px`;
				this.modal.mlbx.classList.add('loaded');
			};
			loader.load();
	},

	close() {

		this.modal.mlbx.classList.remove('loaded');
		this.modal.mlbx.classList.remove('loading');
	},

	init() {

		this.create();
		[].forEach.call(document.querySelectorAll('[rel="mini-lightbox"]'), function (el) {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				MiniLightbox.open(el.href, el.title);
			});
		});
	}
};

document.addEventListener("DOMContentLoaded", () => { MiniLightbox.init() });
