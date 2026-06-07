import { AdminShell } from "@/components/admin-shell";
import { AdminNotice } from "@/components/admin-notice";
import {
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/admin-form-fields";
import { updateProfileAction } from "@/app/admin/profile/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

type ProfilePageProps = {
  searchParams: Promise<{ status?: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const profile = await prisma.profile.findFirst();

  return (
    <AdminShell
      active="/admin/profile"
      title="Perfil publico"
      userEmail={admin.email}
    >
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold">Informacion principal</h2>
          <p className="mt-1 text-sm text-stone-600">
            Esto alimenta la portada y los enlaces principales del portafolio.
          </p>
        </div>

        <AdminNotice status={params.status} />

        <form
          action={updateProfileAction}
          className="space-y-5 rounded-lg border border-stone-200 bg-white/90 p-6 shadow-sm backdrop-blur"
        >
          <input name="id" type="hidden" value={profile?.id ?? "main-profile"} />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              defaultValue={profile?.displayName}
              label="Nombre visible"
              name="displayName"
              required
            />
            <TextField
              defaultValue={profile?.role}
              label="Rol profesional"
              name="role"
              required
            />
          </div>

          <TextAreaField
            defaultValue={profile?.headline}
            label="Titular / resumen"
            name="headline"
            required
            rows={5}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              defaultValue={profile?.location}
              label="Ubicacion"
              name="location"
            />
            <TextField
              defaultValue={profile?.email}
              label="Correo de contacto"
              name="email"
              type="email"
            />
            <TextField
              defaultValue={profile?.phone}
              label="Telefono"
              name="phone"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              defaultValue={profile?.githubUrl}
              label="GitHub"
              name="githubUrl"
              type="url"
            />
            <TextField
              defaultValue={profile?.linkedinUrl}
              label="LinkedIn"
              name="linkedinUrl"
              type="url"
            />
          </div>

          <SubmitButton label="Guardar perfil" />
        </form>
      </div>
    </AdminShell>
  );
}
