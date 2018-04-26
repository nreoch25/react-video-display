import React from "react";
import { render } from "react-dom";
import AdVideoDisplay from "../src/components/AdVideoDisplay";

const mountHeader = document.getElementById("adVideoDisplay");
render(
    <AdVideoDisplay />,
    mountHeader
);
