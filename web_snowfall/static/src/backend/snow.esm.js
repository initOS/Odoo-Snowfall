/** @odoo-module **/
/* © 2023 initOS GmbH
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
 */
/* global showSnow */

import {_t, bus} from "web.core";

bus.on("web_client_ready", null, function () {
    // Use `sessionStorage` to survive browser refresh,
    // or `localStorage` to survive browser restart.
    const let_it_snow =
        window.sessionStorage.getItem("odoo.web_snowfall.snow") !== "false";
    const snow = $('<div id="snow" data-count="200"></div>');
    const toggle = $(`
<div>
<input
id="toggle-snow"
type="checkbox"
${let_it_snow ? 'checked="checked"' : ""}
onclick="showSnow(!!this.checked)"
/>
<label
for="toggle-snow"
class="fa fa-snowflake-o"
title="${_t("Toggle on/off the snow.")}"
/>
</div>
    `);
    $("body").append(snow);
    $("div.o_menu_systray").prepend(toggle);
    // Initial snow state
    showSnow(let_it_snow);
});
