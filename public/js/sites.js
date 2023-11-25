"use strict";

viewSite = (id) => {
    window.fetch(`/sites/${id}`);
}

deleteSite = (id) => {
    window.fetch(`/sites/${id}`, {
        method: "DELETE"
    });
}