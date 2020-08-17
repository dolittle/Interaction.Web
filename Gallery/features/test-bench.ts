// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { observable } from 'aurelia-framework';

export class TestBench {

    @observable
    showDialog: boolean = false;

    openDialog() {
        this.showDialog = true;
    }

    closeDialog() {
        this.showDialog = false;
    }

}
