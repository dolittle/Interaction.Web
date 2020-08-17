// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { bindable } from 'aurelia-framework';

export class horizontal {
    @bindable
    controlledValue = 5;

    controlledValueChanged(newValue: number) {
        console.log(`Value changed to '${newValue}'`);
    }

    formatValue(value: number) {
        return `${value}%`;
    }
}
