var extend = require('object-extend');

class arko {
    constructor(options) {
        this.options = extend({
            selectors: [
                'embed',
                'object',
                'iframe'
            ],
            classNames: {
                active: 'is-responsive',
                container: 'embed-container'
            }
        }, options);

        this.docReady(this.find.bind(this));
    }

    docReady(callback) {
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);
            callback();
        }

        if (document.readyState === "complete") {
            setTimeout(callback);
        } else {
            document.addEventListener("DOMContentLoaded", completed, false);
            window.addEventListener("load", completed, false);
        }
    }

    find() {
        // Get embeds
        var embeds = [];
        this.options.selectors.forEach(function (selector) {
            embeds = embeds.concat([].slice.call(document.querySelectorAll(selector)));
        });

        // Set aspect ratio
        embeds.forEach(function (embed) {
            if (this.isResponsive(embed)) return;

            var pos = embed.getBoundingClientRect();

            // Create container, append embed
            var container = document.createElement('div');
            container.className = this.options.classNames.container;
            container.style.paddingBottom = (100 * pos.height / pos.width) + '%';
            embed.parentNode.insertBefore(container, embed);
            container.appendChild(embed);

            container.classList.add(this.options.classNames.active);
        }.bind(this));
    }

    isResponsive(embed) {
        return embed.parentNode.classList.contains(this.options.classNames.active) || this.exclude(embed);
    }

    static exclude(embed) {
        return embed.classList.contains('instagram-media');
    }
}

module.exports = exports = arko;