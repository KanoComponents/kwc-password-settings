modulizer --out . \
--npm-name @kano/kwc-password-settings \
--npm-version 3.0.0-beta.1 \
--dependency-mapping kwc-button,@kano/kwc-button,3.0.0-beta.1 \
--dependency-mapping kwc-style,@kano/kwc-style,3.0.0-beta.1 \
--dependency-mapping kwc-icons,@kano/kwc-icons,3.0.0-beta.1 \
--dependency-mapping kwc-behaviours,@kano/kwc-behaviors,3.0.0-beta.1
sed -i "s|import '../../@kano/kwc-behaviors/kano-validation.js';|import { Behaviour as ValidationBehavior } from '../../@kano/kwc-behaviors/kano-validation.js';|g" kwc-password-settings.js
sed -i "s|Kano.Validation.Behaviour'|ValidationBehavior'|g" kwc-password-settings.js