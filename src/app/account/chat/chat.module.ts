import { NgModule } from '@angular/core';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { CometChatUI } from '../../../cometchat-pro-angular-ui-kit/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [CometChatUI, ChatRoutingModule],
})
export class ChatModule {}
