import React from "react";
import { mount } from "enzyme";
import SearchForm from './index';

describe("SearchForm", () => {
    let props;
    let mountedSearch;
    const search = () => {
        if (!mountedSearch) {
            mountedSearch = mount(
                <SearchForm {...props} />
            );
        }
        return mountedSearch;
    };

    beforeEach(() => {
        props = {
            errorMessage: undefined
        };
        mountedSearch = undefined;
    });

    it("always renders a div", () => {
        const divs = search().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a form", () => {
        const form = search().find("form");
        expect(form.length).toBe(1);
    });

    describe("when `errorMessage` is passed", () => {
        beforeEach(() => {
            props.errorMessage = "Unauthorized. You should probably re-login into the app.";
        });

        it("renders an error message", () => {
            expect(search().find('.timeline-errorMessage').length).toBe(1);
        });

    describe("when `errorMessage` is undefined", () => {
        beforeEach(() => {
            props.errorMessage = undefined;
        });

        it("does not render an error message", () => {
            expect(search().find('.timeline-errorMessage').length).toBe(0);
        });
    });

    });
});