import EntityAuthentication from "DOMAIN/entities/EntityAuthentication";
import EntityLogin from "DOMAIN/entities/EntityLogin";
import { AuthRequestPayload, AuthResponsePayload } from "redux/auth/authSlice";

export function fromAuthResponeToEntityAuth(authUserRespone: AuthResponsePayload): EntityAuthentication {
    return new EntityAuthentication(authUserRespone.access, authUserRespone.refresh, authUserRespone.avatar)
}
export function fromLoginEntityToLoginRequest(entity: EntityLogin): AuthRequestPayload {
    return { username: entity.getUsername(), password: entity.getPassword() }
}