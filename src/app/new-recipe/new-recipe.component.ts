import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum ProcedureView {
    LIST = 'LIST',
    CARD = 'CARD'
}

class RecipeStep {
    step: string;
    image: string;

    constructor(stepIn) {
        this.step = stepIn['step'];
        this.image = stepIn['image'] || 'https://bulma.io/images/placeholders/96x96.png';
    }
}

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {
    addStepsModalVisible = false;
    procedureView: ProcedureView = ProcedureView.LIST;
    steps = [
        {
            step: 'Cut carrots into small cubes',
            image: 'https://www.almanac.com/sites/default/files/image_nodes/carrots-table_popidar-ss.jpg'
        },
        {
            step: 'Turn on the stove',
            image: 'https://bulma.io/images/placeholders/96x96.png'
        }
    ];

    bulkRecipeStepsForm: FormGroup ;

    constructor(
        private fb: FormBuilder
    ) {
        this.bulkRecipeStepsForm = this.fb.group({
            bulkSteps: []
        });
    }

    ngOnInit() {
    }

    showAddStepsModal = () => this.addStepsModalVisible = true;
    hideAddStepsModal = () => this.addStepsModalVisible = false;

    toggleProcedureView = () => {
        this.procedureView = this.procedureView == ProcedureView.LIST ? ProcedureView.CARD : ProcedureView.LIST;
    }

    addMultipleSteps = (stepsIn: string) => {
        stepsIn.split('\n').forEach(step => {
            this.steps.push(new RecipeStep({ step }));
        });

        this.hideAddStepsModal();
    }
}
