import React from "react";
import { mount } from "enzyme";
import SearchResults from './index';

describe("SearchResults", () => {
    let props;
    let mountedResults;
    const results = () => {
        if (!mountedResults) {
            mountedResults = mount(
                <SearchResults {...props} />
            );
        }
        return mountedResults;
    };

    beforeEach(() => {
        props = {
            timeline: undefined
        };
        mountedResults = undefined;
    });

    it("always renders a div", () => {
        const divs = results().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("when `timeline` is undefined", () => {
        beforeEach(() => {
            props.timeline = undefined;
        });

        it("does not render a `unordered list`", () => {
            expect(results().find("ul").length).toBe(0);
        });
    });
});