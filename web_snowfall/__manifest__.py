# © 2023 initOS GmbH
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
{
    "name": "Snowfall",
    "version": "16.0.1.0.0",
    "category": "Web",
    "author": "initOS GmbH",
    "website": "https://www.initos.com",
    "license": "AGPL-3",
    "summary": "Falling snow (for Xmas on the northern hemisphere).",
    "installable": True,
    "assets": {
        "web.assets_backend": [
            "web_snowfall/static/src/backend/*.css",
            "web_snowfall/static/src/backend/*.js",
            "web_snowfall/static/lib/pure-snow.js",
        ],
    },
    "images": [
        "images/main_screenshot.png",
    ],
    "depends": [
        "web",
    ],
}
